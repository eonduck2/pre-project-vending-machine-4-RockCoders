import IDefaultConstraints from "../../interfaces/constraint/DefaultConstraints.interface";
import IGenerateConstraints from "../../interfaces/constraint/GenerateConstraints.interface";

export default interface IConstraintHelper
  extends IDefaultConstraints,
    IGenerateConstraints {}
