### 課題4-2

- マッチャーの`toBe()`と`toEqual()`の違いは？
- `mockResolvedValue()`と`mockRejectedValue()`のそれぞれの使い方を教えてください
- 下記のテストは成功しますか？成功しない場合、どのマッチャーを使えばいいですか？

```
test('小数点のテスト', () => {
  expect(0.1 + 0.2).toBe(0.3);
});
```

## ans

1.

- toBe はObject.is()と同義で、プリミティブ値の場合は値が同じかを判定し、オブジェクトや配列の場合は同一インスタンスかどうかを判定する
- toEqual は 再帰的な深い比較になり、プリミティブ値の場合は厳密透過比較と同じ、オブジェクトや配列の場合は再帰的に値を比較する。

2.

- mockResolvedValue(value)は、モックされた関数が Promise.resolve(value)を返すように設定できる
- mockRejectedValue(value)は、モックされた関数が Promise.reject(value) を返すように設定できる

3.

浮動小数点誤差により成功しない。
`expect(0.1 + 0.2).toBeCloseTo(0.3);` で 第2小数点以下を気にしないようにするなど書ける。
