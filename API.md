# API

## GET /api/best (랭킹 데이터)

- ### Request parameter
  None
- ### Query parameter
  None
- ### Response

  Success 200

  | Field name | Type             | Description                 |
  | ---------- | ---------------- | --------------------------- |
  | data       | RankingContent[] | 실시간 TOP 12 컨텐츠의 목록 |

  ```typescript
  interface RankingContent {
    idx: Number; // 고유번호
    title: String; // 제목
    url: String; // 상세페이지 URL
    mediaName: String; // 매체사
    imageUrl: String; // 썸네일 URL
  }
  ```

  ```typescript
  HTTP/1.1 200 OK
  {
  "data": [{
    idx: number,
    title: string,
    mediaName: string,
    url: string
  }]
  }
  ```

## GET /api/contents/:category (카테고리별 데이터)

- ### Request parameter

  | Field name | Type   | Description     |
  | ---------- | ------ | --------------- |
  | category   | string | 컨텐츠 카테고리 |

  현재 category 종류: 라이프, 푸드, 여행, 컬쳐

- ### Query parameter

  | Field name | Type   | Description                          |
  | ---------- | ------ | ------------------------------------ |
  | start      | number | {start+1}번째 컨텐츠부터 추가로 로드 |
  | length     | number | 추가로 로드할 컨텐츠의 개수          |

- ### Response

  Success 200

  | Field name | Type         | Description       |
  | ---------- | ------------ | ----------------- |
  | data       | HubContent[] | 카테고리별 데이터 |

  ```typescript
  interface HubContent {
    idx: Number;             // 고유번호
    title: String;           // 제목
    imageUrl: String;        // 썸네일 URL
    mediaName: String;       // 매체사
    url: String;             // 상세페이지 URL
    summaryContent: String;  // 컨텐츠 미리보기
  }

  HTTP/1.1 200 OK
  {
    "data": [{
      idx: number,
      title: string,
      imageUrl: string,
      mediaName: string,
      url: string,
      summaryContent: string
    }]
  }
  ```

## GET /api/detail/:media/:idx (상세 페이지 데이터)

// Request
GET /api/detail/:media/:idx

// Response
상세페이지 컨텐츠 HTML
