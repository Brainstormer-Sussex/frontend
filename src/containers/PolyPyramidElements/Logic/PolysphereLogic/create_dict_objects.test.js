import { create_dicts } from "./create_dicts";

describe("create_dicts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return X and Y dictionaries", () => {
    const problem_matrix_reduced = [
      [true, false, true],
      [false, true, false],
      [true, true, false]
    ];
    const headers_reduced = ["A", "B", "C"];
    const expectedX = {
      A: new Set([0, 2]),
      B: new Set([1, 2]),
      C: new Set([0, 2])
    };
    const expectedY = {
      0: ["A", "C"],
      1: ["B"],
      2: ["A", "B"]
    };

    const [X, Y] = create_dicts(problem_matrix_reduced, headers_reduced);

    expect(X).toEqual(expectedX);
    expect(Y).toEqual(expectedY);
  });
});