import { RuleObject } from "react-simple-form-validator";

export interface FormProperty extends Array<string | RuleObject | undefined> {
    0: string;
    1?: RuleObject;
}