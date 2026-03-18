# @justkits/svg2tsx

## Overview

`@justkits/svg2tsx`는 SVG를 React에 사용할 때, 가장 널리 사용되는 툴인 `svgr`을 사용 편의성을 위해 커스터마이징한 툴로, SVG 파일 세트를 React 컴포넌트로 자동 변환해주는 CLI 도구다.

내부 동작 방식은 [동작 원리 문서](./docs/converter.md)에서 확인할 수 있다.

## Table of Contents

- [설치](#installation)
- [사용법](#usage)
- [규칙 및 제약사항](#-rules--constraints)
- [향후 개선 사항](#-future-considerations)

## Installation

```bash
pnpm add -D @justkits/svg2tsx
# 또는
npm install --save-dev @justkits/svg2tsx
```

## Usage

먼저, 패키지 내부에서 `assets/` 폴더(또는 설정한 커스텀 디렉토리) 안에 SVG 파일들을 저장한다. 그 다음, 패키지 루트에서 다음 명령어를 실행하여 React 컴포넌트로 변환한다.

```bash
pnpm svg2tsx generate
```

설정 파일을 명시적으로 지정하려면 `-c` 또는 `--config` 옵션을 사용한다. (기본적으로 프로젝트 루트에 svg2tsx.config.ts를 두면 자동으로 감지 & 적용한다)

```bash
npx svg2tsx generate --config custom.config.ts
```

설정 관련 자세한 내용은 [설정 문서](./docs/settings.md)를 참고하면 된다. 특히 커스텀 템플릿과 타입 정의를 활용하는 예시는 [여기](./docs/settings.md#커스텀-템플릿-사용하기)에서 확인할 수 있다.

실제로 파일을 쓰거나 삭제하지 않고, 생성·삭제될 파일 목록을 미리 확인하려면 `--dry-run` 플래그를 사용한다. 설정 변경 사항을 커밋하기 전에 결과를 검토하는 데 유용하다.

```bash
pnpm svg2tsx generate --dry-run
```

## 📝 Rules & Constraints

### 1. 파일명 규칙

모든 SVG 파일명은 **엄격한 kebab-case**를 사용해야 한다.

커스텀 규칙: 소문자 알파벳(a-z)과 단일 대시(-)만 허용되며, 숫자, 선행/후행 대시, 이중 대시는 허용되지 않는다. (`/^[a-z]+(-[a-z]+)*$/`)

✅ **올바른 예:**

- `my-icon.svg`
- `chevron-down.svg`
- `user-profile.svg`

❌ **잘못된 예:**

- `MyIcon.svg` (PascalCase)
- `my_icon.svg` (snake_case)
- `myIcon.svg` (camelCase)
- `icon-2.svg` (숫자 포함)
- `-my-icon.svg` (선행 대시)
- `my-icon-.svg` (후행 대시)
- `my--icon.svg` (이중 대시)

### 2. 중복 검증

빌더는 다음 두 가지 중복을 자동으로 검증한다:

1. **컴포넌트 이름 중복**: 서로 다른 카테고리에도 동일한 이름의 아이콘은 허용되지 않는다.

   ```text
   ❌ assets/media/user.svg
   ❌ assets/app/user.svg
   ```

2. **SVG 내용 중복**: 동일한 SVG 내용을 가진 파일이 여러 개 존재할 수 없다.

### 3. 디렉토리 구조

- **FamilySvgBuilder**: `assets/[category]/[icon-name].svg` 구조 필수
- **StandaloneSvgBuilder**: `assets/[icon-name].svg` 플랫 구조 사용

### 4. 출력 경로 및 파일 보존

- **출력 경로**: 기본적으로 변환 결과물은 패키지 루트의 `src/` 디렉토리로 출력된다. `assetsDir`과 `srcDir` 옵션을 통해 입출력 디렉토리를 커스터마이징할 수 있다. 자세한 내용은 [설정 문서](./docs/settings.md)를 참고한다.
- **파일 보존**: 생성 시 이전에 생성된 파일만 삭제된다. svg2tsx는 `.svg2tsx/manifest.json` 파일을 통해 자신이 생성한 파일을 추적하며, 매니페스트에 기록되지 않은 파일은 삭제되지 않는다. 따라서 `types.ts` 등 직접 작성한 파일은 안전하게 보존된다.

## 🔮 Future Considerations

현재 구현되어 있지 않지만, 향후 도입을 고려할 수 있는 기능들이다.

### 1. Watch 모드 (`--watch`)

현재는 명령어를 실행할 때마다 전체 변환을 수행한다. `assets/` 디렉토리의 변경 사항을 감지하여 자동으로 재생성하는 watch 모드를 도입하면, 아이콘을 활발하게 추가·수정하는 개발 환경에서 생산성이 크게 향상될 수 있다.

### 2. 증분 빌드 (변경된 SVG만 재처리)

현재는 실행할 때마다 모든 SVG를 변환한다. 이미 각 파일의 SHA-512 콘텐츠 해시를 계산하고 있으므로, 이전 실행과 해시가 동일한 파일은 변환을 건너뛰는 방식으로 대규모 아이콘 세트에서의 성능을 크게 개선할 수 있다.

### 3. `validate` 서브커맨드

실제 파일을 생성하지 않고, 파일명 규칙 및 중복 여부만 검사하는 lint 전용 커맨드. CI 파이프라인에서 assets 디렉토리의 유효성을 검증하는 용도로 활용할 수 있다.

### 4. 파일명 규칙 커스터마이징

현재 파일명 규칙(`/^[a-z]+(-[a-z]+)*$/`)은 코드에 하드코딩되어 있다. 이를 설정 파일에서 커스터마이징할 수 있도록 하면, 숫자 허용 등 다양한 네이밍 컨벤션을 가진 팀도 별도의 포크 없이 사용할 수 있다.

### 5. React Native 프리셋

문서에서는 SVGR 옵션 조정을 통해 React Native를 지원할 수 있다고 언급하고 있으나, 현재는 수동 설정이 필요하다. `type: "native"` 같은 전용 설정 옵션과 적절한 기본값을 제공하면 별도의 설정 없이 바로 사용할 수 있다.

### 6. 라이프사이클 훅 / 플러그인 시스템

변환 파이프라인에 개입할 수 있는 훅(예: `beforeTransform`, `afterGenerate`)을 제공하면, SVGR의 `template` 옵션만으로는 불가능한 커스텀 후처리(주석 삽입, props 주입 등)도 유연하게 구현할 수 있다.
