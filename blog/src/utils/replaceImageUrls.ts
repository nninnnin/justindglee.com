import {
  each,
  map,
  pipe,
  reduce,
  toArray,
  toAsync,
  zip,
} from "@fxts/core";
import strapiClient from "@hooks/strapiClient";

const replaceImageUrls = async (
  urlFileMap: Map<string, File>,
  contents: string
) => {
  if (!urlFileMap.size) {
    return contents;
  }

  // 컨텐츠에서 이미지 url들을 순서대로 찾아서 업로드 완료된 url로 갈아끼워주는 것

  // 1. upload file
  const uploadedUrlMap = await pipe(
    urlFileMap,
    toAsync,
    async (urlFileMap) => {
      const formData = new FormData();

      await each(
        ([url, file]) =>
          formData.append("files", file, file.name),
        urlFileMap
      );

      const result: {
        data: Array<{
          url: string;
        }>;
      } = await strapiClient.post("/api/upload", formData);

      return result.data;
    },
    map(({ url }) => url),
    // 2. map temporary urls with uploaded urls
    zip(map(([temporaryUrl]) => temporaryUrl, urlFileMap)),
    toArray
  );

  // 3. replace it in contents!
  return reduce(
    (contents, [temporaryUrl, uploadedUrl]) => {
      return contents.replaceAll(temporaryUrl, uploadedUrl);
    },
    contents,
    uploadedUrlMap
  );
};

export default replaceImageUrls;
