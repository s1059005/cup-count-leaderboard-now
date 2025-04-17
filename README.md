# 擲筊比賽即時統計系統

這是一個用於即時統計和顯示擲筊比賽結果的網頁應用程式。系統支援即時輸入參賽者資料、記錄擲筊次數，並自動計算排名。

## 功能特點

- 即時數據輸入和更新
- 自動排名計算
- 分頁顯示
- 資料持久化（localStorage）
- 響應式設計
- 支援鍵盤快速操作

## 技術棧

- React 18
- TypeScript
- Tailwind CSS
- Vite
- shadcn/ui

## Render 平台部署指南

1. 註冊 Render 帳號
   - 前往 [Render](https://render.com) 官網
   - 點擊 "Get Started" 註冊新帳號
   - 可以使用 GitHub 帳號直接登入

2. 連結 GitHub 倉庫
   - 在 Render Dashboard 中點擊 "New +"
   - 選擇 "Static Site"
   - 選擇您的 GitHub 倉庫
   - 如果沒看到倉庫，點擊 "Configure Account" 授權 Render 訪問

3. 配置部署設定
   - 名稱：輸入您想要的專案名稱（例如：cup-count-leaderboard）
   - 分支：選擇要部署的分支（通常是 main 或 master）
   - 建構命令：`npm install && npm run build`
   - 發布目錄：`dist`
   - 環境變數：無需設定（本專案使用 localStorage）

4. 自動部署設定
   - Render 會自動偵測 `render.yaml` 配置文件
   - 每次推送到主分支時會自動觸發部署
   - 可在 Render Dashboard 查看部署狀態和日誌

5. 自定義域名（選擇性）
   - 在專案設定中點擊 "Custom Domains"
   - 點擊 "Add Domain"
   - 按照指示設定 DNS 記錄
   - Render 會自動提供 SSL 證書

6. 監控和維護
   - 在 Render Dashboard 可查看：
     - 部署狀態
     - 錯誤日誌
     - 效能指標
     - 訪問統計

7. 常見問題處理
   - 如果部署失敗，檢查：
     - 建構命令是否正確
     - Node.js 版本是否兼容
     - 專案依賴是否完整
   - 如果頁面無法訪問，檢查：
     - 路由配置是否正確
     - 靜態文件是否正確生成
     - 瀏覽器控制台是否有錯誤

## 開發環境佈署 (Windows)

### 系統需求

- Node.js 18.0 或以上
- npm 8.0 或以上
- Git

### 安裝步驟

1. 安裝 Node.js
   ```bash
   # 從 https://nodejs.org 下載並安裝 Node.js LTS 版本
   ```

2. 克隆專案
   ```bash
   git clone https://github.com/your-username/cup-count-leaderboard-now.git
   cd cup-count-leaderboard-now
   ```

3. 安裝依賴
   ```bash
   npm install
   ```

4. 啟動開發伺服器
   ```bash
   npm run dev
   ```

5. 開啟瀏覽器訪問
   ```
   http://localhost:5173
   ```

### 開發注意事項

- 使用 `npm run build` 進行生產環境建構
- 使用 `npm run preview` 預覽生產環境版本

## 正式環境佈署 (Ubuntu)

### 系統需求

- Ubuntu 20.04 LTS 或以上
- Node.js 18.0 或以上
- Nginx
- PM2 (用於進程管理)

### 安裝步驟

1. 更新系統並安裝必要套件
   ```bash
   sudo apt update
   sudo apt upgrade -y
   sudo apt install -y curl git nginx
   ```

2. 安裝 Node.js
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

3. 安裝 PM2
   ```bash
   sudo npm install -g pm2
   ```

4. 克隆專案
   ```bash
   cd /var/www
   sudo git clone https://github.com/your-username/cup-count-leaderboard-now.git
   cd cup-count-leaderboard-now
   ```

5. 安裝依賴並建構
   ```bash
   npm install
   npm run build
   ```

6. 配置 Nginx
   ```bash
   sudo nano /etc/nginx/sites-available/cup-count-leaderboard
   ```

   加入以下配置：
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       root /var/www/cup-count-leaderboard-now/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

7. 啟用網站配置
   ```bash
   sudo ln -s /etc/nginx/sites-available/cup-count-leaderboard /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

8. 使用 PM2 啟動應用（如果需要後端服務）
   ```bash
   pm2 start npm --name "cup-count" -- start
   pm2 save
   ```

### SSL 配置（選擇性）

1. 安裝 Certbot
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   ```

2. 獲取 SSL 證書
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

### 維護命令

- 重啟應用：`pm2 restart cup-count`
- 查看日誌：`pm2 logs cup-count`
- 監控狀態：`pm2 monit`
- 更新程式：
  ```bash
  cd /var/www/cup-count-leaderboard-now
  git pull
  npm install
  npm run build
  pm2 restart cup-count
  ```

## 資料備份

系統使用 localStorage 儲存資料，建議定期導出資料進行備份：

1. 開啟瀏覽器開發者工具
2. 切換到 Application 標籤
3. 在 Local Storage 中找到並導出資料

## 安全性考慮

- 重置功能需要密碼保護
- 建議定期備份資料
- 建議在正式環境使用 HTTPS

## 問題排解

如果遇到問題，請檢查：

1. Node.js 版本是否符合要求
2. 所有依賴是否正確安裝
3. 建構命令是否執行成功
4. Nginx 配置是否正確
5. 檢查瀏覽器控制台是否有錯誤訊息

## 支援

如有問題，請提交 Issue 或聯繫系統管理員。
