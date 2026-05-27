import { describe, it, expect } from "vitest";
import {
  calcFuel,
  calcSag,
  sagStatus,
  finalDriveRatio,
  gearingCharacter,
  SAG_TARGET,
} from "./physics";
import { psiToBar, barToPsi } from "./units";

describe("calcFuel", () => {
  it("computes liters and weight at 0.74 kg/L", () => {
    expect(calcFuel(20, 0.65, 1.5)).toEqual({ liters: 14.5, weightKg: 10.73 });
  });
});

describe("calcSag / sagStatus", () => {
  it("derives static and rider sag", () => {
    expect(calcSag(300, 295)).toBe(5);
    expect(calcSag(300, 267)).toBe(33);
  });
  it("classifies against target ranges", () => {
    expect(sagStatus(33, SAG_TARGET.front)).toBe("in-range");
    expect(sagStatus(20, SAG_TARGET.front)).toBe("low");
    expect(sagStatus(40, SAG_TARGET.rear)).toBe("high");
  });
});

describe("gearing", () => {
  it("computes final drive ratio", () => {
    expect(finalDriveRatio(16, 43)).toBe(2.688);
  });
  it("characterizes bias", () => {
    expect(gearingCharacter(3.2).bias).toBe("acceleration");
    expect(gearingCharacter(2.4).bias).toBe("top-speed");
    expect(gearingCharacter(2.8).bias).toBe("balanced");
  });
});

describe("pressure units", () => {
  it("round-trips psi <-> bar", () => {
    expect(barToPsi(psiToBar(29))).toBeCloseTo(29, 5);
  });
});
