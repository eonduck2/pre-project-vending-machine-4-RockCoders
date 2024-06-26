/**
 * @eonduck2 24.06.25
 * * 테이블 내, 특정 컬럼을 정의할 때, 제약 조건 설정에 도움을 받을 수 있는 유틸리티
 * @returns { object } 기본 제약 조건 속성들이 정의된 객체
 */
export default () => {
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
};
