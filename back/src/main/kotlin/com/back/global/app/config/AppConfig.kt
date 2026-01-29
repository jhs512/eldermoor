package com.back.global.app.config

import com.back.standard.util.Ut
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import tools.jackson.databind.ObjectMapper

@Configuration
class AppConfig(
    objectMapper: ObjectMapper,
) {
    init {
        Ut.JSON.objectMapper = objectMapper
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()
}
