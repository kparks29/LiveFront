import Hero from "./Hero";
import { render, screen } from "@testing-library/react"

describe('<Hero />', () => {
  it('should render title', () => {
    render(
      <Hero title="Test Title" />
    )
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('should render subtitle', () => {
    render(
      <Hero title="" subtitle="Test Subtitle" />
    )
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
  })

  it('should render image', () => {
    render(
      <Hero title="" imageUrl="test.jpg" />
    )

    const section = document.querySelector('section');
    expect(section?.style.backgroundImage).toEqual(`url("test.jpg")`);
  })

  it('should render default image in no image provided', () => {
    render(
      <Hero title="" />
    )

    const section = document.querySelector('section');
    expect(section?.style.backgroundImage).toEqual(`url("./default-hero.jpg")`);
  })
})