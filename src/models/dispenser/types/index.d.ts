import { IKosDataModel } from "@coca-cola/kos-ui-core";

export interface IDispenserOptions {}

export interface IDispenserModel extends IDispenserOptions, IKosDataModel {
  id: string;
  name: string;
}
