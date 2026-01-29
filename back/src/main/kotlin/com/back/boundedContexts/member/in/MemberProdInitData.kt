package com.back.boundedContexts.member.`in`

import com.back.boundedContexts.member.app.MemberFacade
import com.back.global.app.app.shared.AppFacade
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.ApplicationRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Lazy
import org.springframework.context.annotation.Profile
import org.springframework.core.annotation.Order
import org.springframework.transaction.annotation.Transactional

@Profile("prod")
@Configuration
class MemberProdInitData(
    private val memberFacade: MemberFacade,
    private val appFacade: AppFacade,
) {
    @Lazy
    @Autowired
    private lateinit var self: MemberProdInitData

    @Bean
    @Order(1)
    fun memberNotProdInitDataApplicationRunner(): ApplicationRunner {
        return ApplicationRunner {
            self.makeBaseMembers()
        }
    }

    @Transactional
    fun makeBaseMembers() {
        if (memberFacade.count() > 0) return

        val memberSystem = memberFacade.join("system", "", "시스템")
        memberSystem.modifyApiKey(memberSystem.username)

        val memberHolding = memberFacade.join("holding", "", "홀딩")
        memberHolding.modifyApiKey(memberHolding.username)

        val memberAdmin = memberFacade.join("admin", "", "관리자")
        memberAdmin.modifyApiKey(memberAdmin.username)
    }
}