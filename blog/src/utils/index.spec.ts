const { parseQueryString } = require("./index");

describe("parseQueryString 테스트", () => {
  test("주어진 쿼리스트링을 파싱하여 적절한 결과를 반환해야한다", () => {
    const result = parseQueryString(`?name=justin&age=32`);

    expect(result).toEqual({
      name: "justin",
      age: "32",
    });
  });

  test("쿼리스트링이 주어지지 않았을 때 빈 객체를 반환해야한다", () => {
    const result = parseQueryString(`?`);

    expect(result).toEqual({});
  });
});
