# **๐ํฉ๊ธ๋ง์ผ๐**

<br>

# ๐โโ๏ธ **Members**

<table>
  <tr>
  <td align="center">
      <a href="https://github.com/happyGyu">
        <img src="https://avatars.githubusercontent.com/u/95538993?s=400&u=142c62a8238fbfd3a3e46976651dbc991cafc088&v=4" width="150px;" alt="ํฉํ๊ท ์ฌ์ง"/><br />
        <sub><b>ํฉํ๊ท</b><br></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/youngkyo0504">
        <img src="https://avatars.githubusercontent.com/u/78121870?v=4" width="150px;" alt="๊ธ๊ต์ ์ฌ์ง"/><br />
        <sub><b>๊ธ๊ต์</b><br></sub>
      </a>
    </td>
  </tr>
</table>



## ๊ธฐ์  ์คํ

### FE
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
<img src="https://img.shields.io/badge/reactquery-f59e0b?style=for-the-badge&logo=reactquery&logoColor=white"/>
<img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">


### BE
<img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white">


### INFRA
<img src="https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white">

<!-- https://img.shields.io/badge/{๋ฐฐ์ง์ด๋ฆ}-{css์ปฌ๋ฌ}?style={์คํ์ผ}&logo={๋ก๊ณ }&logoColor={๋ก๊ณ ์ปฌ๋ฌ} -->

## HOW TO RUN

### Prerequisite
> ์ ํ๋ฆฌ์ผ์ด์์ด server(๋ฐฑ์๋)์ client(ํ๋ก ํธ) 

- server ์์กด์ฑ ์ค์น
```bash
# ์์กด์ฑ ์ค์น
cd server
npm i 
```
- server envํ์ผ 
```bash
# TypeORM์ ํ์ 
DATABASE_USER=<string>
DATABASE_PASSWORD=<string>
DATABASE_PORT=<number>
DATABASE_NAME=<string>
DATABASE_HOST=<string>

# ์๋ฒ ํฌํธ
PORT=<number>

# OAUTH ์ฐ๊ฒฐ์ ํ์
GITHUB_CLIENT_ID=<string>
GITHUB_CLIENT_SECRET=<string>

# ์๋ฒ ๋ก๊ทธ์ธ์ ํ์ 
JWT_ACCESS_TOKEN_SECRET=<string>
JWT_ACCESS_TOKEN_EXPIRATION_TIME=<number>
JWT_REFRESH_TOKEN_EXPIRATION_TIME=<number>
JWT_REFRESH_TOKEN_SECRET=<string>

# aws s3์ฐ๊ฒฐ ํ์ (์ด๋ฏธ์ง ์๋ก๋)
AWS_S3_BUCKET_NAME=<string>
AWS_ACCESS_KEY_ID=<string>
AWS_SECRET_ACCESS_KEY=<string>
AWS_REGION=<string>
```

- client

``` bash
cd client
npm i
```

- client ํ๊ฒฝ๋ณ์ 
```bash
REACT_APP_CLIENT_ID=<string>
REACT_APP_DEV_CLIENT_URL=<string>
REACT_APP_PROD_CLIENT_URL=<string>
REACT_APP_TOKEN_REFRESH_INTERVAL=<string>
REACT_APP_DEV_SERVER_URL=<string>
REACT_APP_PROD_SERVER_URL=<string>
```
## ERD

<img height="700" alt="image" src="https://user-images.githubusercontent.com/78121870/187648241-c2f22cb2-c1ac-4015-b64a-467808aa90cd.png">

## DETAIL OF PROJECT

### ๋ก๊ทธ์ธ ํ์ด์ง
<table>
  <tr>
  <td align="center">
       <img height="450" alt="image" src="https://user-images.githubusercontent.com/78121870/187644652-543d45a3-5e00-4085-94ca-228b1ad81751.png">
       </br> 
       <sub><b>๋ก๊ทธ์ธ ํ์ด์ง</b></sub>
      </a>
    </td>
    <td align="center">
       <img height="450" alt="image" src="https://user-images.githubusercontent.com/78121870/187645061-cb1bdb67-35d0-4c3a-a10d-8a5742ad7665.png">
       <br/> <sub><b>๋ก๊ทธ์์ ํ์ด์ง</b><br></sub>
      </a>
    </td>
  </tr>
</table>




- oAuth ๋ก๊ทธ์ธ๊ณผ ํ์คํธ ์ ์ ๋ก๊ทธ์ธ์ ์ง์

### ๋ฉ์ธ ํ์ด์ง
<img height="450" src="https://user-images.githubusercontent.com/78121870/187644501-6291ee7d-f9b5-44f6-9cb7-e57ec9f17b53.png">

- ๋ฌดํ ์คํฌ๋กค์ ํตํด์ ์ํ ๋ชฉ๋ก์ ๋ณผ ์ ์์
- ๋๋ค๋ฅผ ๋ฐ๊ฟ์ ๋ค๋ฅธ ๋๋ค์ ์ํ ๋ชฉ๋ก์ ๋ณผ ์ ์์
- FABํด๋ฆญ์ ์๊ธ ์์ฑ 
- ์ข์์ ๊ธฐ๋ฅ `optimistic update`์ ์ฉ

### ๊ธ ์์ฑ ๋ฐ ์์  

<table>
  <tr>
  <td align="center">
       <img  height="450" alt="image" src="https://user-images.githubusercontent.com/78121870/187645423-1f8c5aa4-7f4c-43f2-9e40-44fcdff59dd0.png">
       </br> 
       <sub><b>์ํ ๊ธ ์์ฑ ํ์ด์ง</b></sub>
      </a>
    </td>
    <td align="center">
       <img  height="450" alt="image" src="https://user-images.githubusercontent.com/78121870/187331742-d5e05f38-da12-4fe2-b8d8-6f85562461b1.png">
       <br/> <sub><b>์ํ ๊ธ ์์  ํ์ด์ง</b><br></sub>
      </a>
    </td>
  </tr>
</table>


- s3์ ์ด๋ฏธ์ง ์๋ก๋ ๊ธฐ๋ฅ
- input ์ ํจ์ฑ ๊ฒ์ฆ ๊ธฐ๋ฅ 

### ์ฑํ ํ์ด์ง 
<table>
  <tr>
  <td align="center">
       <img  height="450" alt="image" src="https://user-images.githubusercontent.com/78121870/187645632-2fd97836-c0b8-4163-ad5d-71b9d739b514.png">
       </br> 
       <sub><b>์ํ ๊ธ ์์ฑ ํ์ด์ง</b></sub>
      </a>
    </td>
    <td align="center">
      <img  height="450" alt="image" src="https://user-images.githubusercontent.com/78121870/187332845-c188b2b8-444e-46ff-a3a4-eec69aa691fb.png">
       <br/> <sub><b>์ํ ๊ธ ์์  ํ์ด์ง</b><br></sub>
      </a>
    </td>
  </tr>
</table>

- Socket IO๋ฅผ ํตํด์ ์ฑํ

### ๋๋ค ๊ฒ์ ํ์ด์ง 
<table>
  <tr>
  <td align="center">
<img  height="450" alt="image" src="https://user-images.githubusercontent.com/78121870/187333132-b716c0ff-ae9e-4287-b5cc-e39917e9038f.png">
       </br> 
       <sub><b>๋๋ค ์ ํ ํ์ด์ง</b></sub>
      </a>
    </td>
    <td align="center">
<img  height="450" alt="image" src="https://user-images.githubusercontent.com/78121870/187333185-ebee0e29-0bf8-4bb5-9c2c-b0de44f69060.png">
       <br/> <sub><b>๋๋ค ๊ฒ์ ํ์ด์ง</b><br></sub>
      </a>
    </td>
  </tr>
</table>

- ๊ฒ์์ ํตํด ๋ด ๋๋ค ์ถ๊ฐ
- ์ ํ ๋๋ค ๋ณ๊ฒฝ ๊ฐ๋ฅ (๋ด ๋๋ค ์ต๋ ๋๊ฐ๊น์ง ๊ฐ๋ฅํฉ๋๋ค.)


### ๋ง์ด ํ์ด์ง 
<table>
  <tr>
  <td align="center">
<img  height="450" alt="image" src="https://user-images.githubusercontent.com/78121870/187645951-e3326459-b402-40f3-9fcb-693bb06a2831.png">
       </br> 
       <sub><b>ํ๋งค๋ชฉ๋ก</b></sub>
      </a>
    </td>
    <td align="center">
<img  height="450" alt="image" src="https://user-images.githubusercontent.com/78121870/187646027-96e7d8d9-1651-46c3-80c5-8fc1827b6c40.png">
       <br/> <sub><b>์ฑํ๋ชฉ๋ก</b><br></sub>
      </a>
    </td>
        <td align="center">
<img  height="450" alt="image" src="https://user-images.githubusercontent.com/78121870/187646060-3a570d37-18af-474a-ae5c-44afdb2b5fe1.png">
       <br/> <sub><b>๊ด์ฌ๋ชฉ๋ก</b><br></sub>
      </a>
    </td>
  </tr>
</table>



