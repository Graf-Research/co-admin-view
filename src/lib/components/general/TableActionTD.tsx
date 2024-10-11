const img_duplicate = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyBmaWxsPSIjRjU5RTBCIiB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KICAgIDxwYXRoIGQ9Ik00Ny44MSA5MS43MjVjMC04LjMyOCA2LjUzOS0xNS4zMTUgMTUuNTY4LTE1LjMzIDkuMDMtLjAxNiAxNC44NjMuMDE1IDE0Ljg2My4wMTVzLS4zODgtOC45LS4zODgtMTUuOTc4YzAtNy4wOCA2LjIyNy0xNC4xNjUgMTUuMjYyLTE0LjE2NXM5Mi44MDItLjI2IDEwMS4yOTcuMzdjOC40OTUuNjMgMTUuMjU2IDUuOTczIDE1LjI1NiAxNC41NjcgMCA4LjU5NC0uMDU0IDkzLjgwNy0uMDU0IDEwMS43IDAgNy44OTItNy4wOCAxNS4wNjMtMTUuODU4IDE1LjE2Mi04Ljc3OC4xLTE0LjcyNy0uMS0xNC43MjctLjFzLjMyMyA5Ljk3LjMyMyAxNi4wOTRjMCA2LjEyMy03LjEyIDE1LjAxNi0xNS40NzQgMTUuMDE2cy05My4xMTcuNTQyLTEwMS4yMDUuNTQyYy04LjA4OCAwLTE1LjU1Mi03LjExNi0xNS4yMDctMTUuOTg3LjM0NS04Ljg3MS4zNDUtOTMuNTguMzQ1LTEwMS45MDZ6bTQ2LjA2LTI4LjQ4N2wtLjA2OCA5OC4xNjRjMCAxLjA5Ni44OTQgMS45OSAxLjk5OSAxLjk4NGw5NS41NTUtLjUxYTIuMDA3IDIuMDA3IDAgMCAwIDEuOTk4LTIuMDFsLS4wNjQtOTcuMjgzYTIuMDEgMi4wMSAwIDAgMC0yLjAxLTIuMDA3bC05NS40LS4zMjZhMS45OSAxLjk5IDAgMCAwLTIuMDEgMS45ODh6TTYzLjI2OCA5NS43OTVsLjkxNiA5Ni4yNDZhMi4wMDcgMi4wMDcgMCAwIDAgMi4wMiAxLjk4Mmw5NC4xMjUtLjcxNWEzLjk3NiAzLjk3NiAwIDAgMCAzLjk1My00LjAyNmwtLjEzNy0xMS4xMzdzLTYyLjg3Ny41NzgtNzEuMDU0LjU3OC0xNS40MzgtNy43NC0xNS40MzgtMTYuNDVjMC04LjcxLjU4OC02OC43LjU4OC02OC43LjAxLTEuMS0uODc0LTEuOTktMS45NzYtMS45NzVsLTkuMDI3LjEzYTQuMDI1IDQuMDI1IDAgMCAwLTMuOTcgNC4wNjd6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4NCjwvc3ZnPg==';
const img_pencil = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgLTAuNSAyNSAyNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0xMy4yOTQyIDcuOTU4ODFDMTMuNTUzMyA3LjYzNTU5IDEzLjUwMTMgNy4xNjM1OCAxMy4xNzggNi45MDQ1M0MxMi44NTQ4IDYuNjQ1NDkgMTIuMzgyOCA2LjY5NzUgMTIuMTIzOCA3LjAyMDcyTDEzLjI5NDIgNy45NTg4MVpNNi44MTEgMTQuODQ4OEw3LjM3OTAzIDE1LjMzODVDNy4zODQ4OSAxNS4zMzE3IDcuMzkwNjIgMTUuMzI0OCA3LjM5NjIzIDE1LjMxNzhMNi44MTEgMTQuODQ4OFpNNi42NCAxNS4yNjY4TDUuODkxNDYgMTUuMjE3OUw1Ljg5MDggMTUuMjMyMUw2LjY0IDE1LjI2NjhaTTYuNSAxOC4yODk4TDUuNzUwOCAxOC4yNTUxQzUuNzQ5MDggMTguMjkyMyA1Ljc1MDEzIDE4LjMyOTYgNS43NTM5NiAxOC4zNjY3TDYuNSAxOC4yODk4Wk03LjI4NyAxOC45NzY4TDcuMzExNTIgMTkuNzI2NEM3LjM2MTU0IDE5LjcyNDcgNy40MTEyNiAxOS43MTgxIDcuNDU5OTYgMTkuNzA2NUw3LjI4NyAxOC45NzY4Wk0xMC4yODcgMTguMjY1OEwxMC40NiAxOC45OTU2TDEwLjQ3MTYgMTguOTkyN0wxMC4yODcgMTguMjY1OFpNMTAuNjcyIDE4LjAyMThMMTEuMjUwNiAxOC40OTkxTDExLjI1NzEgMTguNDkxTDEwLjY3MiAxOC4wMjE4Wk0xNy4yOTcxIDEwLjk1OUMxNy41NTYyIDEwLjYzNTggMTcuNTA0MyAxMC4xNjM4IDE3LjE4MTIgOS45MDQ2NkMxNi44NTgxIDkuNjQ1NTIgMTYuMzg2IDkuNjk3NDIgMTYuMTI2OSAxMC4wMjA2TDE3LjI5NzEgMTAuOTU5Wk0xMi4xMjY5IDcuMDIwNTJDMTEuODY3OCA3LjM0MzY1IDExLjkxOTYgNy44MTU2OCAxMi4yNDI4IDguMDc0ODRDMTIuNTY1OSA4LjMzMzk5IDEzLjAzNzkgOC4yODIxMyAxMy4yOTcxIDcuOTU5MDFMMTIuMTI2OSA3LjAyMDUyWk0xNC4zIDUuNTA5NzZMMTQuODg1MSA1Ljk3OTAxQzE0Ljg5NDkgNS45NjY3MiAxNC45MDQ0IDUuOTU0MTIgMTQuOTEzNSA1Ljk0MTIzTDE0LjMgNS41MDk3NlpNMTUuOTI5IDUuMTg5NzZMMTYuNDA4OCA0LjYxMzMyQzE2LjM4NDkgNC41OTM0NCAxNi4zNTk4IDQuNTc1MDcgMTYuMzMzNyA0LjU1ODNMMTUuOTI5IDUuMTg5NzZaTTE4LjE2NiA3LjA1MTc2TDE4LjY5NjggNi41MjE5MkMxOC42ODA1IDYuNTA1NjEgMTguNjYzNSA2LjQ5MDA3IDE4LjY0NTggNi40NzUzMkwxOC4xNjYgNy4wNTE3NlpNMTguNTAyOSA3Ljg3MjY0TDE5LjI1MjkgNy44NzY3NlY3Ljg3Njc2TDE4LjUwMjkgNy44NzI2NFpNMTguMTU3IDguNjg5NzZMMTcuNjMyIDguMTU0MTJDMTcuNjEwOCA4LjE3NDk2IDE3LjU5MDggOC4xOTcwNCAxNy41NzIxIDguMjIwMjVMMTguMTU3IDguNjg5NzZaTTE2LjEyNzEgMTAuMDIwM0MxNS44Njc4IDEwLjM0MzMgMTUuOTE5NSAxMC44MTUzIDE2LjI0MjUgMTEuMDc0NkMxNi41NjU1IDExLjMzMzkgMTcuMDM3NiAxMS4yODIzIDE3LjI5NjkgMTAuOTU5M0wxNi4xMjcxIDEwLjAyMDNaTTEzLjQ1MzcgNy4zNzg2MkMxMy4zOTIzIDYuOTY4OTggMTMuMDEwNSA2LjY4NjY2IDEyLjYwMDkgNi43NDgwNUMxMi4xOTEyIDYuODA5NDMgMTEuOTA4OSA3LjE5MTI3IDExLjk3MDMgNy42MDA5MUwxMy40NTM3IDcuMzc4NjJaTTE2LjgxMyAxMS4yMzI5QzE3LjIyMzQgMTEuMTc3MiAxNy41MTA5IDEwLjc5OTIgMTcuNDU1MiAxMC4zODg4QzE3LjM5OTQgOS45NzgzNCAxNy4wMjE1IDkuNjkwODIgMTYuNjExIDkuNzQ2NTlMMTYuODEzIDExLjIzMjlaTTEyLjEyMzggNy4wMjA3Mkw2LjIyNTc3IDE0LjM3OTdMNy4zOTYyMyAxNS4zMTc4TDEzLjI5NDIgNy45NTg4MUwxMi4xMjM4IDcuMDIwNzJaTTYuMjQyOTcgMTQuMzU5QzYuMDM1NjEgMTQuNTk5NSA1LjkxMjI2IDE0LjkwMTEgNS44OTE1OSAxNS4yMThMNy4zODg0MSAxNS4zMTU2QzcuMzg3ODYgMTUuMzI0IDcuMzg0NTcgMTUuMzMyMSA3LjM3OTAzIDE1LjMzODVMNi4yNDI5NyAxNC4zNTlaTTUuODkwOCAxNS4yMzIxTDUuNzUwOCAxOC4yNTUxTDcuMjQ5MiAxOC4zMjQ1TDcuMzg5MiAxNS4zMDE1TDUuODkwOCAxNS4yMzIxWk01Ljc1Mzk2IDE4LjM2NjdDNS44MzU2MyAxOS4xNTg2IDYuNTE1ODggMTkuNzUyNCA3LjMxMTUyIDE5LjcyNjRMNy4yNjI0OCAxOC4yMjcyQzcuMjU5MjggMTguMjI3MyA3LjI1NzcxIDE4LjIyNjggNy4yNTY2OSAxOC4yMjY0QzcuMjU1MjYgMTguMjI1OSA3LjI1MzM3IDE4LjIyNDkgNy4yNTE0NCAxOC4yMjMyQzcuMjQ5NSAxOC4yMjE1IDcuMjQ4MjUgMTguMjE5OCA3LjI0NzU0IDE4LjIxODVDNy4yNDcwMyAxOC4yMTc1IDcuMjQ2MzcgMTguMjE2IDcuMjQ2MDQgMTguMjEyOEw1Ljc1Mzk2IDE4LjM2NjdaTTcuNDU5OTYgMTkuNzA2NUwxMC40NiAxOC45OTU1TDEwLjExNCAxNy41MzZMNy4xMTQwNCAxOC4yNDdMNy40NTk5NiAxOS43MDY1Wk0xMC40NzE2IDE4Ljk5MjdDMTAuNzc3MSAxOC45MTUxIDExLjA1IDE4Ljc0MjIgMTEuMjUwNiAxOC40OTlMMTAuMDkzNCAxNy41NDQ1QzEwLjA5NTggMTcuNTQxNyAxMC4wOTg5IDE3LjUzOTcgMTAuMTAyNCAxNy41Mzg4TDEwLjQ3MTYgMTguOTkyN1pNMTEuMjU3MSAxOC40OTFMMTcuMjk3MSAxMC45NTlMMTYuMTI2OSAxMC4wMjA2TDEwLjA4NjkgMTcuNTUyNkwxMS4yNTcxIDE4LjQ5MVpNMTMuMjk3MSA3Ljk1OTAxTDE0Ljg4NTEgNS45NzkwMUwxMy43MTQ5IDUuMDQwNTJMMTIuMTI2OSA3LjAyMDUyTDEzLjI5NzEgNy45NTkwMVpNMTQuOTEzNSA1Ljk0MTIzQzE1LjA1MjEgNS43NDQxMSAxNS4zMjE0IDUuNjkxMiAxNS41MjQzIDUuODIxMjNMMTYuMzMzNyA0LjU1ODNDMTUuNDU0NCAzLjk5NDg0IDE0LjI4NzMgNC4yMjQxIDEzLjY4NjUgNS4wNzgzTDE0LjkxMzUgNS45NDEyM1pNMTUuNDQ5MiA1Ljc2NjJMMTcuNjg2MiA3LjYyODJMMTguNjQ1OCA2LjQ3NTMyTDE2LjQwODggNC42MTMzMkwxNS40NDkyIDUuNzY2MlpNMTcuNjM1MiA3LjU4MTYxQzE3LjcxMTEgNy42NTc3IDE3Ljc1MzUgNy43NjEgMTcuNzUyOSA3Ljg2ODUyTDE5LjI1MjkgNy44NzY3NkMxOS4yNTU3IDcuMzY5MDUgMTkuMDU1NSA2Ljg4MTI3IDE4LjY5NjggNi41MjE5MkwxNy42MzUyIDcuNTgxNjFaTTE3Ljc1MjkgNy44Njg1MkMxNy43NTI0IDcuOTc2MDQgMTcuNzA4OCA4LjA3ODg2IDE3LjYzMiA4LjE1NDEyTDE4LjY4MiA5LjIyNTQxQzE5LjA0NDYgOC44NzAwMiAxOS4yNTAxIDguMzg0NDcgMTkuMjUyOSA3Ljg3Njc2TDE3Ljc1MjkgNy44Njg1MlpNMTcuNTcyMSA4LjIyMDI1TDE2LjEyNzEgMTAuMDIwM0wxNy4yOTY5IDEwLjk1OTNMMTguNzQxOSA5LjE1OTI4TDE3LjU3MjEgOC4yMjAyNVpNMTEuOTcwMyA3LjYwMDkxQzEyLjMxOTYgOS45MzIyMSAxNC40NzcxIDExLjU1MDMgMTYuODEzIDExLjIzMjlMMTYuNjExIDkuNzQ2NTlDMTUuMDg4MSA5Ljk1MzUyIDEzLjY4MTUgOC44OTg1NSAxMy40NTM3IDcuMzc4NjJMMTEuOTcwMyA3LjYwMDkxWiIgZmlsbD0iIzIyQzU1RSIvPg0KPC9zdmc+';
const img_delete = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0xNiA5TDEzLjAwMDEgMTEuOTk5OU0xMy4wMDAxIDExLjk5OTlMMTAgMTVNMTMuMDAwMSAxMS45OTk5TDEwLjAwMDIgOU0xMy4wMDAxIDExLjk5OTlMMTYuMDAwMiAxNU04IDZIMTlDMTkuNTUyMyA2IDIwIDYuNDQ3NzIgMjAgN1YxN0MyMCAxNy41NTIzIDE5LjU1MjMgMTggMTkgMThIOEwyIDEyTDggNloiIHN0cm9rZT0iI0VGNDQ0NCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPg0KPC9zdmc+';

interface TableActionTDProps {
  onEdit?(): void
  onDelete?(): void
  onDuplicate?(): void
}

export function TableActionTD(props: TableActionTDProps) {
  return (
    <td className={`w-[100px]`}>
      <div className={`flex gap-[8px]`}>
        { props.onDuplicate && <img 
          onClick={() => props.onDuplicate && props.onDuplicate()}
          className={`cursor-pointer h-[22px] object-contain`}
          src={img_duplicate} /> }
        { props.onEdit && <img 
          onClick={() => props.onEdit && props.onEdit()}
          className={`cursor-pointer h-[22px] object-contain`}
          src={img_pencil} /> }
        { props.onDelete && <img 
          onClick={() => props.onDelete && props.onDelete()}
          className={`cursor-pointer h-[22px] object-contain`}
          src={img_delete} /> }
      </div>
    </td>
  );
}