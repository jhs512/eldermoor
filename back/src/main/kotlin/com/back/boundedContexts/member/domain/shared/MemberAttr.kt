package com.back.boundedContexts.member.domain.shared

import com.back.global.jpa.domain.shared.BaseTime
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import jakarta.persistence.UniqueConstraint
import org.hibernate.annotations.NaturalId

@Entity
@Table(
    uniqueConstraints = [
        UniqueConstraint(columnNames = ["subject_id", "name"])
    ]
)
class MemberAttr(
    @field:NaturalId
    @field:ManyToOne(fetch = FetchType.LAZY)
    @field:JoinColumn(name = "subject_id")
    val subject: Member,
    @field:NaturalId
    val name: String,
    @field:Column(name = "val", columnDefinition = "TEXT")
    var value: String,
) : BaseTime()