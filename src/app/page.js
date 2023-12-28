"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { Unbounded } from 'next/font/google'
import Container from '@mui/material/Container'
import Box from "@mui/material/Box"
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
const inter = Unbounded({ subsets: ['latin'], weight: '400' })
import Stack from "@mui/material/Stack"
import Divider from '@mui/material/Divider';
import React, { useState, useRef, useEffect } from 'react'
import { useSpring, a } from '@react-spring/web'
import useMeasure from 'react-use-measure'
import { Specialdiv, Title, Frame, Content, toggle } from './styles'
import * as Icons from './icons'


const itemData = [
  {
    img: '/backround/road.jpg',
    title: 'Breakfast',
    rows: 2,
    cols: 3,
  },
  {
    img: '/backround/subway.jpg',
    title: 'Burger',
    rows: 2,
    cols: 3,
  },
  {
    img: '/backround/street.jpg',
    title: 'Camera',
    cols: 4,
    rows: 3,
  },
  {
    img: '/backround/sand.jpg',
    title: 'Coffee',
    cols: 4,
    rows: 2,
  },

];
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function Home() {


  return (
    <>



      <Stack>
        <Box>

          <Grid container>
            <Grid item xs="auto">


              <h1 className={inter.className} id={styles.name}>
                Akash Kallumkal
              </h1>


            </Grid>
            <Grid item xs="4">
              <Container>
                <ImageList variant="quilted"
                  cols={8}
                  rowHeight={120}
                  sx={{ width: "230%", height: "90%", borderRadius: 12 }}>
                  {itemData.map((item) => (
                    <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                      <img
                        {...srcset(item.img, 121, item.rows, item.cols)}
                        alt={item.title}

                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Container>

            </Grid>
          </Grid>
        </Box>
        <iframe sx="border-radius:12px" src="https://open.spotify.com/embed/track/6jo3Sv2PWgX7oX2gSsvbI5?utm_source=generator" width="100%" height="90" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

        <Box >

          <Grid container>
            <Grid item xs="auto">
              <h1 className={inter.className} id={styles.name}>Skills</h1>
            </Grid>
            <Grid item xs="auto">
              <Container>
                <Treefun />
              </Container>


            </Grid>
          </Grid>
        </Box>
        <Divider light />
        <Box   >
          <Grid container>
            <Grid item xs="auto">
              <h1 className={inter.className} id={styles.name}>About</h1>
            </Grid>
            
            <Grid item xs="auto">
              Backround
            </Grid>
          </Grid>
        </Box>
      </Stack>

    </>


  )
}


// If loading a variable font, you don't need to specify the font weight

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => void (ref.current = value), [value])
  return ref.current
}

const Tree = React.memo(({ children, name, style, defaultOpen = false }) => {
  const [isOpen, setOpen] = useState(defaultOpen)
  const previous = usePrevious(isOpen)
  const [ref, { height: viewHeight }] = useMeasure()
  const { height, opacity, y } = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      y: isOpen ? 0 : 20
    }
  })
  // @ts-ignore
  const Icon =
    Icons[`${children ? (isOpen ? "Minus" : "Plus") : "Close"}SquareO`]
  return (
    <Frame>
      <Icon
        style={{ ...toggle, opacity: children ? 1 : 0.3 }}
        onClick={() => setOpen(!isOpen)}
      />
      <Title style={style}>{name}</Title>
      <Content
        style={{
          opacity,
          height: isOpen && previous === isOpen ? "auto" : height
        }}
      >
        <a.div ref={ref} style={{ y }} children={children} />
      </Content>
    </Frame>
  )
})

function Treefun() {
  return (
    <Container>
      <Specialdiv>
        <Tree name="Programming" defaultOpen>
          <Tree name="Linux" >
            <Tree name="Ubuntu" />
            <Tree name="Debian" />
            <Tree name="Kubernetes" />
            <Tree name="Docker" />
          </Tree>
          <Tree name="Hypervisors">
            <Tree name="Proxmox" />
          </Tree>
          <Tree name="Languages">
            <Tree name="Python" />
            <Tree name="Rust" />
            <Tree name="Java" />
            <Tree name="Javascript" />
          </Tree>


        </Tree>
      </Specialdiv>
    </Container>
  );

}

