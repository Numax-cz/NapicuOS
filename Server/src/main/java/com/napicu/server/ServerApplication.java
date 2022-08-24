package com.napicu.server;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class ServerApplication implements ApplicationRunner{

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

  @Override
  public void run(ApplicationArguments args) throws Exception {

  }

  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurerAdapter() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("*");
        registry.addMapping("/**").allowedHeaders("*");
        registry.addMapping("/**").allowedMethods("*");
      }
    };
  }
}
