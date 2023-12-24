package com.emergency.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class SwaggerConfig {
//	@Bean
//	public Docket api() {
//		return new Docket(DocumentationType.SWAGGER_2)
//				.select()
//				.apis(RequestHandlerSelectors.basePackage("com.emergency.model.controller"))
//				.paths(PathSelectors.ant("/**/*api/**")) 
//				.build()
//				.apiInfo(apiInfo());
//	}
//	
//	private ApiInfo apiInfo() {
//		return new ApiInfoBuilder()
//				.title("Emergency")
//				.description("응급 상황 대처 어플")
//				.version("0.1")
//				.build();
//	}
//}
//
//import io.swagger.v3.oas.annotations.OpenAPIDefinition;
//import io.swagger.v3.oas.annotations.info.Info;
//import lombok.RequiredArgsConstructor;
//import org.springdoc.core.models.GroupedOpenApi;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@OpenAPIDefinition(
//        info = @Info(title = "Emergency",
//                description = "Emergency 명세",
//                version = "v1"))
//@RequiredArgsConstructor
//@Configuration("com.emergency.model.controller")
//public class SwaggerConfig {
//
//    @Bean
//    public GroupedOpenApi chatOpenApi() {
//        String[] paths = {"/**/*api/**\""};
//
//        return GroupedOpenApi.builder()
//                .group("Emergency API v1")
//                .pathsToMatch(paths)
//                .build();
//    }
//}

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        Info info = new Info()
                .title("emergency")
                .description("Emergency");
        return new OpenAPI()
                .info(info);
    }
}