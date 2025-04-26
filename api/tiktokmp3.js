export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Only POST method is allowed.' });
    }

    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ success: false, message: 'No URL provided.' });
    }

    try {
        const apiUrl = `https://api.akuari.my.id/downloader/tiktok2?link=${encodeURIComponent(url)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data || !data.respon || !data.respon.music) {
            throw new Error('Invalid response from API.');
        }

        return res.status(200).json({
            success: true,
            audioUrl: data.respon.music
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to fetch TikTok MP3.' });
    }
}
