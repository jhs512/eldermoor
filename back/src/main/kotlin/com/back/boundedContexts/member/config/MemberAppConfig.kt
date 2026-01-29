package com.back.boundedContexts.member.config

import com.back.boundedContexts.member.domain.Member
import com.back.boundedContexts.member.out.MemberAttrRepository
import org.springframework.context.annotation.Configuration

@Configuration
class MemberAppConfig(
    memberAttrRepository: MemberAttrRepository,
) {
    init {
        Member.Companion.attrRepository_ = memberAttrRepository
    }
}