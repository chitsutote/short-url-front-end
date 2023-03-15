import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import ShortUrlType from '../../types/ShortUrl'
import { shortUrlBuilder } from '../../utils/urlBuilder'

const HistoryLinksTable = ({
  urls,
}: {
  urls: ShortUrlType[]
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Original Url</TableCell>
            <TableCell>Short Url</TableCell>
            <TableCell>Click Times</TableCell>
            <TableCell>Expired</TableCell>
            <TableCell>Copy it!</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            urls.map(({
              id,
              original_url,
              short_id,
              click_times,
              is_expired,
            }, index) => (
              <TableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{index+1}</TableCell>
                <TableCell>{original_url}</TableCell>
                <TableCell>{shortUrlBuilder(short_id)}</TableCell>
                <TableCell>{click_times}</TableCell>
                <TableCell>{is_expired ? 'yes' : 'no'}</TableCell>
                <TableCell>
                  <Button
                    disabled={is_expired}
                    onClick={() => {
                      navigator.clipboard.writeText(shortUrlBuilder(short_id))
                    }}
                  >
                    Copy
                  </Button>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default HistoryLinksTable
