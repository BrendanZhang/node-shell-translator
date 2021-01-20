# Node Shell Translator

[![NPM Version](http://img.shields.io/npm/v/node-shell-translator.svg?style=flat)](https://www.npmjs.org/package/node-shell-translator)

- Node Shell Translator is a cli translation tool.
- Based on Nodejs and youdao api server.
- Using chalk to coloring command log.

```shell
❯ fy hello

hello
英 [həˈləʊ] 美 [həˈləʊ]

int. 喂；哈罗，你好，您好（表示问候， 惊奇或唤起注意时的用语）
n. （Hello）（法）埃洛（人名）
[ 复数 hellos 第三人称单数 helloes 现在分词 helloing 过去式 helloed 过去分词 helloed ]

网络释义
Hello 你好 ; 您好 ; 哈啰 ; 喂

短语
Hello Kitty 凯蒂猫 ; 吉蒂猫
Hello Neighbor 你好邻居

web dict (​https://www.youdao.com/w/en/hello​)
初中 高中 CET4 CET6 考研
```

## Installation

```shell
yarn global add node-shell-translator
```

## Usage

```
fy -t <type> [words]
```

- type: Origin language and target language connecting with `2` (`en2zh-CHS`)，default is `auto` if user didn't pass `-t` option
- [Available languages](#available-languages)
- words: Words you want to translate, sentence supported.

## Options

| Args  | Required |
| ----- | -------- |
| words | true     |
| type  | false    |

## Available languages

| type  | means               |
| ----- | ------------------- |
| zh2en | Chinese to English  |
| zh2ja | Chinese to Japanese |
| zh2ko | Chinese to Korean   |
| zh2fr | Chinese to French   |
| zh2es | Chinese to Spanish  |
| zh2it | Chinese to Italian  |
| zh2ru | Chinese to Russian  |
| en2zh | English to Chinese  |
| ja2zh | Japanese to Chinese |
| ko2zh | Korean to Chinese   |
| fr2zh | French to Chinese   |
| es2zh | Spanish to Chinese  |
| it2zh | Italian to Chinese  |
| ru2zh | Russian to Chinese  |
