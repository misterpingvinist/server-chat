import test from "ava";

test("arrays are equal", (t) => {
    t.deepEqual([1, 3], [1, 2]);
});
