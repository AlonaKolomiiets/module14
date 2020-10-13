const apiKey = '18623540-b96dabcd57ccb87763c2123d9';
const baseUrl = 'https://pixabay.com/api/';
//URL-строка запроса:
//https://pixabay.com/api/videos/?key=18623540-b96dabcd57ccb87763c2123d9&q=yellow+flowers

export default {
  async getIllustration(query) {
    try {
      let additionalUrl = `videos/?key=${apiKey}&q=${query}`;

      const result = await fetch(`${baseUrl}${additionalUrl}`);

      return await result.json();
    } catch (e) {
      console.log(e);
      return [];
    }
  },
};
