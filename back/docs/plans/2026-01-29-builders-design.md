# 빌더스(Builders) 플랫폼 설계

> 작성일: 2026-01-29

## 1. 프로젝트 개요

검증된 솔로 빌더(1인 개발자)들이 아이디어/프로젝트를 올리고, 관심 있는 사람(투자자, 협업자, 기업 등)이 연락처를 열람할 수 있는 플랫폼.

### 핵심 특징
- **검증된 빌더만 게시 가능**: 게시글마다 포트폴리오/MVP 심사
- **판매 상품 2가지**: 게시물 등록권, 연락처 열람권 (인앱결제)
- **웹 + 앱 구조**: 웹은 조회만, 결제는 앱에서만 (인앱결제)
- **PG사 불필요**: 앱스토어/플레이스토어 인앱결제만 사용

---

## 2. 플랫폼 구조

| 플랫폼 | 가능한 기능 |
|-------|-----------|
| 웹 | 게시글 조회, 회원가입/로그인 |
| 앱 (웹뷰) | 게시글 조회 + **게시물 등록권 구매** + **연락처 열람권 구매** |

---

## 3. 판매 상품

| 상품 | 가격 예시 | 설명 |
|-----|---------|-----|
| 게시물 등록권 | 10,000원 | 게시물 1개, 3개월 노출 |
| 연락처 열람권 | 5,000원 | 빌더 연락처 1회 확인 |

- 결제: 앱스토어/플레이스토어 인앱결제
- 수수료: 15~30% (앱스토어 정책)

---

## 4. 롤

| 롤 | 설명 |
|----|-----|
| USER | 일반 사용자 (게시글 조회, 빌더 활동, 열람 모두 가능) |
| ADMIN | 관리자 (게시글 심사, 회원 관리) |

---

## 5. 유스케이스

### 5.1 USER

**로그인 불필요:**
- 게시물 리스트 조회
- 게시물 상세 조회

**로그인 필요:**

*게시글 작성 (빌더 활동)*
- 게시물 작성 (아이디어 + 포트폴리오 첨부) → 심사 대기
- 포트폴리오 첨부 항목:
  - 프로젝트 제목
  - 개발 기간
  - 간략한 개요 (다운로드 수, 수익 경험 등 포함)
  - 링크 (앱스토어/플레이스토어/웹)
- 심사 결과 확인 (승인/반려+반려사유)
- 승인 시 게시물 등록권 구매 (인앱결제) → 노출 시작
- 내가 올린 게시물 목록 조회
- 게시물 수정/삭제
- 노출 기간 연장 구매

*연락처 열람*
- 연락처 열람권 구매 (인앱결제, 건당)
- 내가 열람한 프로젝트 목록 조회

*프로필*
- 연락처 설정 (이메일, 전화 등)
- 프로필 관리

### 5.2 ADMIN

- 심사 대기 게시물 목록 조회
- 게시물 심사 (포트폴리오/MVP 검토, 실현가능성)
- 승인/반려 (반려 시 사유 작성)
- 부적절한 게시물 삭제/비공개 처리
- 회원 목록 조회
- 문제 회원 제재/탈퇴 처리

---

## 6. 게시글 상태

| 상태 | 설명 |
|-----|-----|
| `DRAFT` | 작성 중 |
| `PENDING_REVIEW` | 심사 대기 |
| `UNDER_REVIEW` | 심사 중 |
| `REJECTED` | 반려 (사유 포함, 수정 후 재제출 가능) |
| `APPROVED` | 승인 (결제 대기) |
| `ACTIVE` | 노출 중 |
| `EXPIRED` | 만료 (연장 결제 가능) |
| `DELETED` | 삭제 |

### 상태 흐름

```
[DRAFT] → [PENDING_REVIEW] → [UNDER_REVIEW]
                                    ↓
                             ┌──────┴──────┐
                             ↓             ↓
                         [APPROVED]    [REJECTED]
                             ↓             ↓
                        (등록권 결제)  (수정 후 재제출)
                             ↓
                          [ACTIVE] ──(3개월 만료)──→ [EXPIRED]
                             ↓                         ↓
                          (삭제)                   (연장 결제)
                             ↓                         ↓
                         [DELETED]                  [ACTIVE]
```

---

## 7. 데이터 모델

### User

| 필드 | 타입 | 설명 |
|-----|-----|-----|
| id | Long | PK |
| email | String | OAuth 이메일 |
| nickname | String | 닉네임 |
| contactInfo | String | 연락처 (빌더용) |
| role | Enum | USER, ADMIN |
| createdAt | DateTime | 가입일 |

### Post (게시글)

| 필드 | 타입 | 설명 |
|-----|-----|-----|
| id | Long | PK |
| authorId | Long | FK → User |
| title | String | 아이디어 제목 |
| content | String | 아이디어 설명 |
| techStack | String | 기술스택 |
| portfolioTitle | String | 포트폴리오 프로젝트 제목 |
| portfolioDescription | String | 포트폴리오 간략 개요 |
| portfolioDevPeriod | String | 개발 기간 |
| portfolioLink | String | MVP/앱 링크 |
| status | Enum | DRAFT ~ DELETED |
| rejectionReason | String | 반려 사유 (nullable) |
| exposureStartAt | DateTime | 노출 시작일 (nullable) |
| exposureEndAt | DateTime | 노출 종료일 (nullable) |
| createdAt | DateTime | 작성일 |

### Payment (결제)

| 필드 | 타입 | 설명 |
|-----|-----|-----|
| id | Long | PK |
| userId | Long | FK → User |
| postId | Long | FK → Post (nullable) |
| type | Enum | POST_REGISTER, CONTACT_VIEW |
| amount | Int | 결제 금액 |
| storeTransactionId | String | 앱스토어/플레이스토어 거래 ID |
| store | Enum | APPLE, GOOGLE |
| createdAt | DateTime | 결제일 |

### ContactView (연락처 열람 기록)

| 필드 | 타입 | 설명 |
|-----|-----|-----|
| id | Long | PK |
| viewerId | Long | FK → User (열람자) |
| postId | Long | FK → Post |
| paymentId | Long | FK → Payment |
| createdAt | DateTime | 열람일 |

---

## 8. 다음 단계

- [ ] 화면 구성 설계
- [ ] API 설계
- [ ] 기술스택 확정
- [ ] 개발 시작
