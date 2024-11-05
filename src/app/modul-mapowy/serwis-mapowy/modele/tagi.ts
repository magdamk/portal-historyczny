import { TlumaczeniaNazw } from "./tlumaczenia-nazw";

export interface TagiDto {
  tagid: number,
  tag: TlumaczeniaNazw,
  kategoria?: TlumaczeniaNazw
}
