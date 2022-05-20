import { renderHook, act } from "@testing-library/react-hooks";
import { useScreenStatesGetter } from "../../hooks/useScreenState";

describe("useScreenState hook", () => {
  let result: any;

  beforeEach(() => {
    const hook = renderHook(() => useScreenStatesGetter());
    return (result = hook.result);
  });

  it("should update shouldUpdate state", () => {
    expect(result.current.shouldUpdate).toEqual(true);

    act(() => {
      result.current.setShouldUpdate(false);
    });

    expect(result.current.shouldUpdate).toEqual(false);
  });

  it("should update isModalOpen", () => {
    expect(result.current.isModalOpen).toEqual(false);

    act(() => {
      result.current.setModalOpen(true);
    });

    expect(result.current.isModalOpen).toEqual(true);
  });

  it("should update isProjectModalOpen", () => {
    expect(result.current.isProjectModalOpen).toEqual(false);

    act(() => {
      result.current.setProjectModalOpen(true);
    });

    expect(result.current.isProjectModalOpen).toEqual(true);
  });

  it("should update snackBarMsg", () => {
    const snackBarMsg = "Success!";
    expect(result.current.snackBarMsg).toEqual("");

    act(() => {
      result.current.setSnackBarMsg(snackBarMsg);
    });

    expect(result.current.snackBarMsg).toEqual(snackBarMsg);
  });

  it("should update showSnackBar", () => {
    expect(result.current.showSnackBar).toEqual(false);

    act(() => {
      result.current.setShowSnackBar(true);
    });

    expect(result.current.showSnackBar).toEqual(true);
  });
});
