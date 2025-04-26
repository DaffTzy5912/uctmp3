import { tiktok } from 'api-dylux';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Only POST method is allowed.' });
    }

    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ success: false, message: 'No URL provided.' });
    }

    try {
        const result = await tiktok(url);
        return res.status(200).json({
            success: true,
            audioUrl: result.result.music
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to fetch TikTok MP3.' });
    }
}
