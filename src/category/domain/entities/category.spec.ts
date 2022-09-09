import { Category, CategoryProperties } from "./category";
import { omit } from "lodash";
import { validate as uuidValidate } from "uuid";

describe("Category Tests", () => {
  test("constructor of category AAA", () => {
    //Arrange
    const props = {
      name: "Movie",
      created_at: new Date(),
      is_active: true,
      description: "description",
    };

    //Action
    const category = new Category(props);

    //Assert
    expect(category.name).toBe("Movie");
    expect(category.description).toBe("description");
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBe(props.created_at);
  });

  test("id field", () => {
    type CategoryData = {
      props: CategoryProperties;
      id?: string | null;
    };

    const data: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: "af181c2a-3078-11ed-a261-0242ac120002" },
    ];

    data.forEach((i) => {
      const category = new Category(i.props, i.id);
      expect(category.id).not.toBeNull();
      expect(uuidValidate(category.id)).toBeTruthy();
    });
  });

  test("constructor of category", () => {
    let category = new Category({ name: "Movie" });

    const props = omit(category.props, "created_at");
    expect(props).toStrictEqual({
      name: "Movie",
      description: undefined,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
    });

    let created_at = new Date();
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at: created_at,
    });

    category = new Category({
      name: "Movie",
      description: "other description",
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      description: "other description",
    });

    category = new Category({
      name: "Movie",
      is_active: true,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: true,
    });

    created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      created_at,
    });
  });

  test("getter of name props", () => {
    const category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");
  });

  test("getter and setter of description props", () => {
    let category = new Category({ name: "Movie" });
    expect(category.description).toBe(undefined);

    category = new Category({ name: "Movie", description: "some description" });
    expect(category.description).toBe("some description");

    category["description"] = "other description";
    expect(category.description).toBe("other description");

    category["description"] = undefined;
    expect(category.description).toBe(null);
  });

  test("getter and setter of is_active props", () => {
    let category = new Category({ name: "Movie" });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: true });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: false });
    expect(category.is_active).toBeFalsy();
  });

  test("getter of created_at props", () => {
    let category = new Category({ name: "Movie" });
    expect(category.created_at).toBeInstanceOf(Date);

    const created_at = new Date();
    category = new Category({ name: "Movie", created_at: created_at });
    expect(category.created_at).toBe(created_at);
  });
});
