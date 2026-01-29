package com.back.global.app.app.shared

import com.back.global.app.app.CustomConfigProperties
import org.springframework.core.env.Environment
import org.springframework.stereotype.Service

@Service
class AppFacade(
    private val customConfigProperties: CustomConfigProperties,
    environment: Environment,
) {
    init {
        Companion.environment = environment
    }

    companion object {
        private lateinit var environment: Environment

        val isDev: Boolean by lazy { environment.matchesProfiles("dev") }
        val isTest: Boolean by lazy { environment.matchesProfiles("test") }
        val isProd: Boolean by lazy { environment.matchesProfiles("prod") }
        val isNotProd: Boolean by lazy { !isProd }
        val systemMemberId: String by lazy { environment.getProperty("custom.systemMember.id")!! }
        val systemMemberUsername: String by lazy { environment.getProperty("custom.systemMember.username")!! }
        val systemMemberNickname: String by lazy { environment.getProperty("custom.systemMember.nickname")!! }
        val systemMemberApiKey: String by lazy { environment.getProperty("custom.systemMember.apiKey")!! }
        val frontBaseUrl: String by lazy { environment.getProperty("custom.frontBaseUrl")!! }
        val backBaseUrl: String by lazy { environment.getProperty("custom.backBaseUrl")!! }
    }

    val notProdMembers
        get() = customConfigProperties.notProdMembers
}