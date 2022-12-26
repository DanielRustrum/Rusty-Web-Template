# Module: components/core/list

## Functions

### ElementList

▸ **ElementList**<`DataType`\>(`list`, `template`): `React.ReactNode`[]

Create a list of JSX Elements

#### Type parameters

| Name |
| :------ |
| `DataType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `list` | `DataType`[] | List of the data to be Iterated |
| `template` | (`key`: `string`, `value`: `DataType`, `index`: `number`) => `ReactNode` | Template for the data to be applied |

#### Returns

`React.ReactNode`[]

A list of JSX Elements
