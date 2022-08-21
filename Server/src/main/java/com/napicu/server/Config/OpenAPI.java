package com.napicu.server.Config;


import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPI {
    @Bean
    public io.swagger.v3.oas.models.OpenAPI openApi() {
        return new io.swagger.v3.oas.models.OpenAPI ()
                .info(new Info()
                        .title("NapicuBiosAPI")
                        .description("NapicuAPI pro NapicuBios")
                        .version("v2.0")
                        .contact(new Contact()
                                .name("Numax")
                                .url("https://napicu.eu")
                                .email("numax@napicu.eu"))
                        .license(new License().name("MIT").url("https://opensource.org/licenses/mit-license.php"))
                ).addServersItem(new Server()
                        .url("http://localhost:8080")
                        .description("NapicuWeb Server")
                );
    }
}
