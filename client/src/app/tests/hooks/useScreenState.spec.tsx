import { renderHook, act } from "@testing-library/react-hooks";
import { useScreenStatesGetter } from "../../hooks/useScreenState";

describe("useScreenState hook", () => {
  it("should update isModalOpen", () => {
    const { result } = renderHook(() => useScreenStatesGetter());
    expect(result.current.isModalOpen).toEqual(false);

    act(() => {
      result.current.setModalOpen(true);
    });

    expect(result.current.isModalOpen).toEqual(true);
  });

  it("should update isProjectModalOpen", () => {
    const { result } = renderHook(() => useScreenStatesGetter());
    expect(result.current.isProjectModalOpen).toEqual(false);

    act(() => {
      result.current.setProjectModalOpen(true);
    });

    expect(result.current.isProjectModalOpen).toEqual(true);
  });

  it("should update snackBarMsg", () => {
    const { result } = renderHook(() => useScreenStatesGetter());
    const snackBarMsg = "Success!";
    expect(result.current.snackBarMsg).toEqual("");

    act(() => {
      result.current.setSnackBarMsg(snackBarMsg);
    });

    expect(result.current.snackBarMsg).toEqual(snackBarMsg);
  });

  it("should update showSnackBar", () => {
    const { result } = renderHook(() => useScreenStatesGetter());
    expect(result.current.showSnackBar).toEqual(false);

    act(() => {
      result.current.setShowSnackBar(true);
    });

    expect(result.current.showSnackBar).toEqual(true);
  });
});
