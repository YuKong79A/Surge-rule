# Surge-rule

## SenPlayer 视频播放通知

### 指定视频

只匹配 `https://txh068.com/h5/m3u8/link/d096f4ceafbf9d07a24a84e9e509098d.m3u8`：

https://raw.githubusercontent.com/YuKong79A/Surge-rule/main/modules/senplayer-txh068.sgmodule

此模块仅对 `txh068.com` 启用 MITM。若已安装下方通用模块，可将通用模块关闭。

### 所有可识别的视频

在 Surge 中通过以下地址安装通用模块：

https://raw.githubusercontent.com/YuKong79A/Surge-rule/main/modules/senplayer-all-videos.sgmodule

模块发现常见视频直链或 HLS 播放列表时发送通知。点击通知后，Surge 会尝试通过 SenPlayer 的 URL Scheme 打开该地址。需要 Surge iOS 5.11.0 或 Surge Mac 5.7.0 及以上版本，并启用 MITM、信任 Surge 证书、允许通知。

通用模块使用全域 MITM，以便识别不同站点的视频。部分使用证书锁定的 App 会因此拒绝连接；遇到此情况请关闭通用模块。加密视频、无法识别出直链的视频，以及需要原 App 的 Cookie 或请求头才能访问的视频，可能无法在 SenPlayer 播放。
