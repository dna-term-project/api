import { tags } from "typia";

export interface HelloDto {
  /**
   * Text asdfadsfsd
   */
  text: string & tags.MaxLength<10>
}