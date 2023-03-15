import {
  useEffect,
  useState,
} from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import validator from 'validator'
import { useNavigate } from 'react-router-dom'
import api from '../../api/api'
import ShortUrlType from '../../types/ShortUrl'
import { urlBuilder } from '../../utils/urlBuilder'
import HistoryLinksTable from './HistoryLinksTable'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 50px;
  text-align: center;
`

const StyledTextField = styled(TextField)`
  width: 80%;
`

const ErrorText = styled.p`
  color: red;
`

const SubmitButton = styled(Button)`
  display: block !important;
  margin: 15px auto 20px !important;
`

const CopyButton = styled(Button)`
  display: block !important;
  margin: 15px auto 20px !important;
`

const LogoutButton = styled(Button)`
  position: absolute !important;
  top: 10px;
  right: 10px;
`

const HistoryLinksTableWrapper = styled.div`
  width: 70%;
  margin: 30px auto 0;
`

function Home() {
  const [urlList, setUrlList] = useState<ShortUrlType[]>([])
  const [urlInput, setUrlInput] = useState<string>('')
  const [isShorteningUrl, setIsShorteningUrl] = useState<boolean>(false)
  const [isSuccessShorten, setIsSuccessShorten] = useState<boolean>(false)
  const [urlInputError, setUrlInputError] = useState<{
    isError: boolean
    error?: string
  }>({
    isError: false,
    error: undefined,
  })
  const navigate = useNavigate()

  useEffect(() => {
    const getShortUrlList = async () => {
      const response = await api.get('/short-urls')
      if (response.status === 200 && !response.data?.error) {
        setUrlList(response.data.urls)
      }
    }

    getShortUrlList()
  }, [])

  const createShortUrl = async () => {
    setIsShorteningUrl(true)
    try {
      const response = await api.post('/short-url', {
        url: urlBuilder(urlInput),
      })
      setIsShorteningUrl(false)

      if (response.status === 200 && !response.data?.error) {
        const url = response.data.url

        const urlListResponse = await api.get('/short-urls')
        if (urlListResponse.status === 200 && !urlListResponse.data?.error) {
          setUrlList(urlListResponse.data.urls)
        }

        setUrlInput(url)
        setIsSuccessShorten(true)
      }
    } catch (error) {
      setIsShorteningUrl(false)
    }
  }

  return (
    <Wrapper>
      <LogoutButton
        onClick={() => {
          localStorage.removeItem('auth')
          navigate('/login')
        }}
      >
        Log out
      </LogoutButton>
      <h1>Shorten Url</h1>
      <StyledTextField
        error={urlInputError.isError}
        placeholder="Shorted your url"
        value={urlInput}
        onChange={({ target }) => {
          setUrlInput(target.value)
          setIsSuccessShorten(false)
        }}
        onBlur={() => {
          const isInvalidUrl = !validator.isURL(urlBuilder(urlInput))
          setUrlInputError({
            isError: isInvalidUrl,
            error: isInvalidUrl ? 'Invalid url' : undefined,
          })
        }}
      />
      {
        urlInputError.isError && (<ErrorText>Invalid Url</ErrorText>)
      }
      <SubmitButton
        variant="contained"
        disabled={!urlInput || isShorteningUrl || urlInputError.isError}
        onClick={() => {
          createShortUrl()
        }}
      >
        Generate
      </SubmitButton>
      {
        isSuccessShorten && (
          <CopyButton
            onClick={() => {
              navigator.clipboard.writeText(urlInput)
            }}
          >
            Copy
          </CopyButton>
        )
      }
      <HistoryLinksTableWrapper>
        <HistoryLinksTable urls={urlList} />
      </HistoryLinksTableWrapper>
    </Wrapper>
  )
}

export default Home
