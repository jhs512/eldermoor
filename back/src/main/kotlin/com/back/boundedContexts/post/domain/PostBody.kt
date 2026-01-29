package com.back.boundedContexts.post.domain

import com.back.global.jpa.domain.shared.BaseEntity
import jakarta.persistence.Entity

@Entity
class PostBody(
    var content: String
) : BaseEntity()