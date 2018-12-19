const key = 'AIzaSyATlq2rGwHi9DIOIQBPtY7ALfU3r8vrCR0';

export const query = `https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&maxResults=15`;
export const statsQuery = `https://www.googleapis.com/youtube/v3/videos?key=${key}&part=statistics`;
