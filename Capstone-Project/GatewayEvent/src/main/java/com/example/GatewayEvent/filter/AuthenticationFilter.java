package com.example.GatewayEvent.filter;


import com.example.GatewayEvent.exception.UnAuthorizedException;
import com.example.GatewayEvent.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
@Order(1)
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private RouteValidator validator;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            // Check if the request requires authentication
            if (validator.isSecured.test(request)) {
                // Check if Authorization header is present
                if (!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    return Mono.error(new UnAuthorizedException("Missing Authorization header"));
                }

                String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    authHeader = authHeader.substring(7);
                } else {
                    return Mono.error(new UnAuthorizedException("Invalid Authorization header"));
                }

                try {
                    // Validate the token
                    jwtUtil.validateToken(authHeader);

                    // Forward the token to downstream services
                    ServerHttpRequest modifiedRequest = request.mutate()
                            .header(HttpHeaders.AUTHORIZATION, "Bearer " + authHeader)
                            .build();

                    return chain.filter(exchange.mutate().request(modifiedRequest).build());

                } catch (Exception e) {
                    return Mono.error(new UnAuthorizedException("Unauthorized access"));
                }
            }

            // If the request does not require authentication, just proceed
            return chain.filter(exchange);
        });
    }

    public static class Config {
    }
}
