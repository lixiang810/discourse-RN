import axios from "axios";
import config from "../config/config";
import PostType from "../types/PostType";
import GetTopicResType from "../types/Topics/GetTopicsResType";
import apiKeyWrapper from "./apiKeyWrapper";

const discourseWrapper = {
  async getTopic(topicID: number) {
    const { data }: { data: { post_stream: { posts: PostType[] } } } =
      await axios.get(`${config.url}/t/${topicID}.json`, {
        headers: {
          "User-Api-Key": apiKeyWrapper.key,
          "User-Api-Client-Id": config.clientId,
          "User-Agent": config.userAgent,
        },
      });
    return data.post_stream;
  },

  async getTopics(page = 0) {
    const { data }: { data: GetTopicResType } = await axios.get(
      `${config.url}/latest.json` +
        (page ? `?no_definitions=true&page=${page}` : ""),
      {
        headers: {
          "User-Api-Key": apiKeyWrapper.key,
          "User-Api-Client-Id": config.clientId,
          "User-Agent": config.userAgent,
        },
      }
    );
    const { users } = data;
    const { topics, more_topics_url } = data.topic_list;
    const nextPage = Number(more_topics_url.split("&")[1].replace("page=", ""));
    return { users, topics, nextPage };
  },

  getAvatarAddr(template: string) {
    return config.url + template.replace("{size}", "128");
  },
};

export default discourseWrapper;
