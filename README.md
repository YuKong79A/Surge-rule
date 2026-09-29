# Surge-rule

## YouTube 双语字幕

模块文件：[modules/dualsubs-youtube.sgmodule](modules/dualsubs-youtube.sgmodule)。在 Surge 中导入该本地文件；若从 GitHub 订阅，发布此仓库后可使用 `https://raw.githubusercontent.com/YuKong79A/Surge-rule/main/modules/dualsubs-youtube.sgmodule`。

此模块沿用 DualSubs YouTube v1.5.11 的播放器与字幕请求脚本，并将 Universal 字幕脚本固定到 v1.7.5。默认 `Type=Translate`、源语言自动识别、目标语言简体中文。保留 YouTube Music 歌词翻译。YouTube 自带字幕语言列表中的“自动翻译”选项才是双语字幕入口。

安装和排查：

1. 先停用旧版 DualSubs YouTube 或其他同样修改 `player`、`get_watch`、`timedtext` 的字幕模块。Surge 对同一请求只执行第一个匹配的请求脚本，重复启用会导致字幕轨道未生成。
2. 启用 Surge 的脚本和 MITM，安装并信任 Surge 证书。确认 `www.youtube.com`、`m.youtube.com`、`youtubei.googleapis.com` 已在 MITM 主机列表中；随后重启 YouTube App 并播放有原生 CC 字幕的视频。
3. 如果仍不能选择语言，在 Surge 的请求记录中检查 `youtubei/v1/player` 的脚本命中情况，查看是否执行 `DualSubs.YouTube.Player.response.json` 或 `.proto`。如果没有，先检查 MITM、模块启用状态和冲突模块。若已命中但报错，临时把 `LogLevel` 改为 `DEBUG` 并保存相关日志。
4. BoxJs 的 DualSubs 持久化设置优先于模块参数。曾设置过 `Type=Official` 或其他语言时，在 BoxJs 中改成 `Translate` / `ZH-HANS`，或清理旧设置后重开 YouTube。

此模块无法用于 Apple TV（tvOS）的 YouTube App；[上游文档](https://dualsubs.github.io/guide/youtube.html)说明该 App 的 `www.youtube.com` 连接不能被 MITM。需要网络请求经过 Surge 的设备才能生效。
