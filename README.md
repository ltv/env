# env

NodeJS safe environment parser. Compatible with TypeScript.

In this version,

- I have removed dotenv support. If you want to use dotenv, please use the previous version. Otherwise, you should install the dotenv package yourself.
- I have removed the lodash.has and lodash.trim dependencies, and the package size has been reduced. There is no dependency anymore.

## Features

- Safe environment parser
- Compatible with TypeScript

With typescript, if you're using are not mentioning the default value, the return type will be `T | undefined`.
Otherwise, the return type will be `T`.

e.g.

```ts
const foo = env.string('FOO') // foo: string | undefined
const bar = env.string('BAR', 'bar') // bar: string
```

## Installation

```bash
npm install @ltv/env
```

## Usage

```js
const env = require('@ltv/env')
```

```ts
import env from '@ltv/env'
```

### env.string

```ts
env.string(key: string, defaultValue?: string): string
```

### env.int

```ts
env.int(key: string, defaultValue?: number): number
```

### env.float

```ts
env.float(key: string, defaultValue?: number): number
```

### env.bool

```ts
env.bool(key: string, defaultValue?: boolean): boolean
```

### env.array

```ts
env.array(key: string, defaultValue?: string[]): string[]
```

### env.json

```ts
env.json(key: string, defaultValue?: object): object
```

### env.date

```ts
env.date(key: string, defaultValue?: Date): Date
```
