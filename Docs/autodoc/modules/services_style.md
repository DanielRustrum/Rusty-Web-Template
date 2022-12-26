# Module: services/style

## Type Aliases

### AttributeStyleType

Ƭ **AttributeStyleType**: `CSS.Properties`

___

### ObjectStyleType

Ƭ **ObjectStyleType**: `Styles`

## Functions

### createObjectStyles

▸ **createObjectStyles**<`C`, `Props`, `Theme`\>(`styles`, `options?`): (`data?`: `Props` & { `theme?`: `Theme`  }) => `Classes`<`C`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `string` = `string` |
| `Props` | `unknown` |
| `Theme` | `Theme` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `styles` | `Styles`<`C`, `Props`, `Theme`\> \| (`theme`: `Theme`) => `Styles`<`C`, `Props`, `undefined`\> |
| `options?` | `CreateUseStylesOptions`<`Theme`\> |

#### Returns

`fn`

▸ (`data?`): `Classes`<`C`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `data?` | `Props` & { `theme?`: `Theme`  } |

##### Returns

`Classes`<`C`\>
