
`./src/pages/index.tsx`의 `<Head>` 부분을 알맞게 수정해 주세요.  
```html
<meta content="○○○❤○○○ 결혼식에 초대합니다" name="Title" />
<meta content="○○○○년 ○○월 ○○일 ○요일 오전 ○○시 ○○분" name="Description" />
<meta content="○○○○년 ○○월 ○○일 ○요일 오전 ○○시 ○○분" name="Keyword" />
<meta property="og:title" content="○○○❤○○○ 결혼식에 초대합니다" />
<meta property="og:description" content="○○○○년 ○○월 ○○일 ○요일 오전 ○○시 ○○분" />
<meta property="og:url" content="https://kyuhyuk.kr/wedding-invitation" />
<meta name="theme-color" content="#BCAAA4" />
```

`./src/data.json`를 수정하여 사용합니다.  
```json
{
  "date": "1970년 01월 01일, 목요일 오전 12시 00분",
  "location": "○○○웨딩, ○층 ○○홀",
  "gretting": "서로 마주 보며 다져온 사랑을\n이제 함께 한곳을 바라보며 걸어갈 수 있는\n큰 사랑으로 키우고자 합니다.\n저희 두 사람이 사랑의 이름으로 지켜나갈 수 있게\n앞날을 축복해 주시면 감사하겠습니다.",
  "groom": {
    "name": "○○○",
    "parents_name": "○○○ & ○○○"
  },
  "bride": {
    "name": "○○○",
    "parents_name": "○○○ & ○○○"
  }
}
```
