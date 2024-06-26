class AbstractConstraintHelper {
  static getDefaultConstraints() {}

  static generateConstraintString() {}
}

export default class ConstraintHelper extends AbstractConstraintHelper {
  /**
   * @eonduck2 24.06.25
   * * 테이블 내, 특정 컬럼을 정의할 때, 제약 조건 설정에 도움을 받을 수 있는 유틸리티
   * @returns { object } 기본 제약 조건 속성들이 정의된 객체
   */
  static getDefaultConstraints() {
    return {
      type: {
        NULL: false,
        INTEGER: false,
        REAL: false,
        TEXT: false,
        BLOB: false,
      },
      primaryKey: false,
      unique: false,
      notNull: false,
      autoIncrement: false,
      defaultValue: null,
      check: null,
      foreignKey: {
        referencedTable: null,
        referencedColumn: null,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    };
  }

  /**
   * @eonduck2 24.06.25
   * * 테이블의 제약 조건들을 설정하기 위해, 조립시켜주는 유틸리티
   * @param { object } 정적 메서드인 getDefaultConstants()를 참조한 형태의 객체
   * @returns { object } 인자로 받은 제약 조건들을 문자열로 조립
   */

  static generateConstraintString(properties) {
    const constraints = [];

    for (const [type, isSet] of Object.entries(properties.type)) {
      if (isSet) {
        constraints.push(type);
        break; // 한 번에 하나의 타입만 추가
      }
    }
    if (properties.primaryKey) constraints.push("PRIMARY KEY");
    if (properties.unique) constraints.push("UNIQUE");
    if (properties.notNull) constraints.push("NOT NULL");
    if (properties.autoIncrement) constraints.push("AUTOINCREMENT");
    if (properties.defaultValue !== null)
      constraints.push(`DEFAULT ${properties.defaultValue}`);
    if (properties.check !== null)
      constraints.push(`CHECK(${properties.check})`);
    if (
      properties.foreignKey.referencedTable &&
      properties.foreignKey.referencedColumn
    ) {
      constraints.push(
        `REFERENCES ${properties.foreignKey.referencedTable}(${properties.foreignKey.referencedColumn})`
      );
      if (properties.foreignKey.onDelete)
        constraints.push(`ON DELETE ${properties.foreignKey.onDelete}`);
      if (properties.foreignKey.onUpdate)
        constraints.push(`ON UPDATE ${properties.foreignKey.onUpdate}`);
    }
    return constraints.join(" ");
  }
}
