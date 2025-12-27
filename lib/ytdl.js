const axios = require('axios');
const fs = require('fs');
const { randomBytes } = require('crypto');
const { fetchBuffer } = require("./myfunc");

const ytIdRegex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/;

class YT {
    constructor() { }

    static isYTUrl = (url) => {
        return ytIdRegex.test(url);
    }

    static getVideoID = (url) => {
        if (!this.isYTUrl(url)) throw new Error('is not YouTube URL');
        return ytIdRegex.exec(url)[1];
    }

    /**
     * Search YouTube videos
     * @param {string} query 
     * @param {object} options 
     * @returns 
     */
    static search = async (query, options = {}) => {
        try {
            const yts = require("youtube-yts");
            const search = await yts.search({ query, hl: 'id', gl: 'ID', ...options });
            return search.videos;
        } catch (error) {
            throw new Error(`Search failed: ${error.message}`);
        }
    }

    /**
     * Download MP3 from YouTube using Veron API
     * @param {string} url YouTube URL
     * @returns 
     */
    static mp3 = async (url) => {
        try {
            if (!url) throw new Error('YouTube URL is required');
            
            // Get MP3 download link from API
            const response = await axios.get(`https://veron-apis.zone.id/downloader/youtube?url=${encodeURIComponent(url)}`);
            
            if (!response.data.success || !response.data.result.success) {
                throw new Error('Failed to fetch MP3 from API');
            }

            const apiResult = response.data.result;
            const fileName = `${randomBytes(4).toString('hex')}.mp3`;
            const filePath = `./XeonMedia/audio/${fileName}`;

            // Download the MP3 file directly
            const audioResponse = await axios({
                method: 'GET',
                url: apiResult.download,
                responseType: 'stream'
            });

            // Save file
            const writer = fs.createWriteStream(filePath);
            audioResponse.data.pipe(writer);

            await new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });

            return {
                meta: {
                    title: apiResult.meta.title,
                    channel: apiResult.meta.author,
                    image: apiResult.meta.thumbnail,
                    duration: apiResult.meta.duration
                },
                path: filePath,
                size: fs.statSync(filePath).size
            };
        } catch (error) {
            throw new Error(`MP3 download failed: ${error.message}`);
        }
    }

    /**
     * Get downloadable video URL
     * @param {string} url YouTube URL
     * @param {string|number} quality Desired quality
     * @returns 
     */
    static mp4 = async (url, quality = '360') => {
        try {
            if (!url) throw new Error('YouTube URL is required');
            
            // Get video download link from API
            const response = await axios.get(`https://veron-apis.zone.id/downloader/youtube1?url=${encodeURIComponent(url)}&type=video&quality=${quality}`);
            
            if (!response.data.success || !response.data.result.success) {
                throw new Error('Failed to fetch video from API');
            }

            const apiResult = response.data.result;
            
            return {
                title: apiResult.title,
                thumb: apiResult.thumbnail,
                date: new Date().toLocaleDateString('id-ID'),
                duration: apiResult.duration,
                channel: 'YouTube',
                quality: apiResult.quality + 'p',
                videoUrl: apiResult.downloadUrl
            };
        } catch (error) {
            throw new Error(`Video download failed: ${error.message}`);
        }
    }

    /**
     * Download music track (for play/song commands)
     * @param {string} query Search query
     * @returns 
     */
    static downloadMusic = async (query) => {
        try {
            // Search for the video
            const searchResults = await this.search(query);
            if (!searchResults || searchResults.length === 0) {
                throw new Error('No results found');
            }

            const firstResult = searchResults[0];
            
            // Download MP3 using the found URL
            const result = await this.mp3(firstResult.url);
            
            return {
                meta: {
                    title: firstResult.title,
                    artist: firstResult.author.name,
                    image: firstResult.thumbnail,
                    duration: {
                        seconds: firstResult.seconds,
                        label: firstResult.timestamp
                    }
                },
                path: result.path,
                size: result.size
            };
        } catch (error) {
            throw new Error(`Music download failed: ${error.message}`);
        }
    }
}

module.exports = YT;