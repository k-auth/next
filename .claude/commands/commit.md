---
description: 변경된 파일들을 한줄 커밋 메시지로 깔끔하게 커밋
---

변경된 파일들을 확인하고 관련된 파일들만 스테이징하여 한줄로 깔끔하게 커밋해주세요.

요구사항:

- git status와 git diff로 변경 내용 확인
- 관련된 파일들만 git add
- 커밋 메시지 형식: `타입: 설명` (예: `feat: 지도 화면 마커 추가`)
- 커밋 타입: feat/fix/refactor/docs/style/perf/chore 등 적절히 선택
- 한국어로 간결하고 명확하게 작성 (50자 이내)
- 프로젝트 구조 고려 (views/hooks/lib/api/components/types)
- **중요: Claude 서명 없이 깔끔하게 커밋 (Co-Authored-By 등 추가 메시지 제외)**

커밋 타입 가이드:

- feat: 새 기능 추가
- fix: 버그 수정
- refactor: 코드 리팩토링 (기능 변경 없음)
- style: UI/디자인 변경
- perf: 성능 개선
- docs: 문서 수정
- chore: 빌드/설정 변경
