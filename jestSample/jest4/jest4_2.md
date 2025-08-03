### 課題4-2

- マッチャーの`toBe()`と`toEqual()`の違いは？
  - オブジェクトを評価する場合、`toBe()`は参照の同一性、`toEqual()`は値の同一性を評価する
- `mockResolvedValue()`と`mockRejectedValue()`のそれぞれの使い方を教えてください
  - 非同期処理の完了した状態をモックするのに`mockResolvedValue()`、失敗した状態をモックするのに`mockRejectedValue()`を使用する
- 下記のテストは成功しますか？成功しない場合、どのマッチャーを使えばいいですか？
```
test('小数点のテスト', () => {
  expect(0.1 + 0.2).toBe(0.3);
});
```
  - 失敗する。`toBeCloseTo()`を使用すれば成功させることができる